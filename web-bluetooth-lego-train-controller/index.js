'use strict';

async function wait(millis) {
  return new Promise((resolve) => {
    setTimeout(resolve, millis);
  });
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
};

window.addEventListener('load', async () => {
  const sliderContainer = document.getElementById('slider-container');

  const reconnectContainer = document.getElementById('reconnect-container');
  const reconnectAttemptElement = document.getElementById('reconnect-attempt');
  const reconnectMessage = document.getElementById('reconnecting-message');

  const connectContainer = document.getElementById('connect-container');
  const connectButton = document.getElementById('connect-button');
  const connectErrorMessage = document.getElementById('connect-error-message');

  const legoTrain = document.getElementById('lego-train');
  const legoWire = document.getElementById('lego-wire');

  let wireDirection = parseInt(Cookies.get('wire-direction'));
  if (isNaN(wireDirection)) {
    wireDirection = -1;
  }
  let connectorPosition = parseInt(Cookies.get('connector-position'));
  if (isNaN(connectorPosition)) {
    connectorPosition = -1;
  }

  function updateLegoUi() {
    Cookies.set('wire-direction', wireDirection, {expires: 365});
    Cookies.set('connector-position', connectorPosition, {expires: 365});

    let scale = 1;
    let translateX = 0;
    if (wireDirection === 1 && connectorPosition === 1) {
      translateX = 100;
      scale = 1;
    } else if (wireDirection === 1 && connectorPosition === -1) {
      translateX = -35;
      scale = 1;
    } else if (wireDirection === -1 && connectorPosition === 1) {
      translateX = 35;
      scale = -1;
    } else if (wireDirection === -1 && connectorPosition === -1) {
      translateX = -100;
      scale = -1;
    }
    legoWire.style.setProperty('transform', `translateX(${translateX}px) scaleX(${scale})`);
    legoTrain.style.setProperty('transform', `scaleX(${connectorPosition})`);
  }
  updateLegoUi();
  legoTrain.classList.add('show');
  legoWire.classList.add('show');

  legoTrain.addEventListener('click', function(event) {
    connectorPosition *= -1;
    updateLegoUi();
  });

  legoWire.addEventListener('click', function(event) {
    wireDirection *= -1;
    updateLegoUi();
  });

  let slider = null;
  let currentValue = null;
  const bluetooth = new Bluetooth();
  bluetooth.addEventListener('connect', () => {
    if (slider) {
      slider.setValue(currentValue, true);
    }

    sliderContainer.style.setProperty('display', '');
    connectContainer.style.setProperty('display', 'none', 'important');
    reconnectContainer.style.setProperty('display', 'none', 'important');
  });

  let reconnectAttempt;
  bluetooth.addEventListener('disconnect', () => {
    reconnectAttempt = 1;
    reconnectMessage.innerText = '';
    sliderContainer.style.setProperty('display', 'none', 'important');
    reconnectContainer.style.setProperty('display', '');
  });

  bluetooth.addEventListener('reconnecting', (event) => {
    reconnectAttemptElement.innerText = `#${reconnectAttempt}`;
    reconnectAttempt++;
  });

  bluetooth.addEventListener('reconnect-failed', (event) => {
    reconnectMessage.innerText = event.detail.message;
  });

  connectButton.addEventListener('click', async () => {
    connectErrorMessage.innerHTML = '';
    connectButton.disabled = true;

    try {
      await bluetooth.connect();

      const values = 17; // positive, odd number
      const factor = 1; // > 0 && <= 1
      const lowerStart = 0.45;

      const options = [];
      const middle = (values - 1) / 2;
      for (let i = 0; i < values; i++) {
        let distance = -(i - middle);
        if (distance === -0) {
          distance = 0;
        }
        const percentage = Math.round(distance / middle * 10000) / 10000;
        const absPercentage = Math.abs(percentage);

        let value = (factor * percentage / (1 + lowerStart) + lowerStart * Math.sign(distance)) * -1;
        if (wireDirection === 1 && connectorPosition === 1) {
          value *= 1;
        } else if (wireDirection === 1 && connectorPosition === -1) {
          value *= 1;
        } else if (wireDirection === -1 && connectorPosition === 1) {
          value *= -1;
        } else if (wireDirection === -1 && connectorPosition === -1) {
          value *= -1;
        }

        let backgroundColor;
        if (distance === 0) {
          backgroundColor = ``;
        } else if (distance > 0) {
          backgroundColor = `rgba(${Math.round(absPercentage * 255)}, ${Math.round((1 - absPercentage) * 255)}, 0, 0.6)`;
        } else {
          backgroundColor = `rgba(0, ${Math.round((1 - absPercentage) * 255)}, ${Math.round(absPercentage * 255)}, 0.6)`;
        }
        options.push({
          label: `${Math.round(percentage * 100)} %`,
          value,
          backgroundColor,
        });
      }

      console.log(options);
      currentValue = options[middle].value;
      slider = new Slider(document.getElementById('slider'), {options});
      slider.addEventListener('change', (event) => {
        currentValue = event.detail.value;
        bluetooth.writeValue(event.detail.value);
      });
      slider.setValue(currentValue);
    } catch (e) {
      console.error(e);
      connectErrorMessage.innerText = e.message;
      connectButton.disabled = false;
    }
  });
});

class Bluetooth {
  #elementForListeners = document.createElement('div');

  #device = null;
  #characteristic = null;

  #writePromise = Promise.resolve();

  #currentValue = null;
  #latestValueToWrite = null;

  async connect() {
    console.log('Pressed', navigator, navigator.bluetooth);

    this.#device = await navigator.bluetooth.requestDevice({
      optionalServices: ['0bd51666-e7cb-469b-8e4d-2742f1ba77cc'],
      acceptAllDevices: true,
    });
    console.log('Device', this.#device);

    this.#device.addEventListener('gattserverdisconnected', () => {
      console.log('Disconnected');
      this.#characteristic = null;

      this.#elementForListeners.dispatchEvent(new CustomEvent('disconnect', {}));
      this.#reconnect();
    });
    await this.#connect();
  }

  async #connect() {
    console.log('Connecting');
    const server = await this.#device.gatt.connect();
    console.log('Server', server);

    const service = await server.getPrimaryService('0bd51666-e7cb-469b-8e4d-2742f1ba77cc');
    console.log('Service', service);

    for (const characteristic of await service.getCharacteristics('e7add780-b042-4876-aae1-112855353cc1')) {
      console.log('Characteristic', characteristic);
      this.#characteristic = characteristic;
    }

    this.#elementForListeners.dispatchEvent(new CustomEvent('connect', {}));
  }

  async #reconnect() {
    let reconnectWait = 1000;
    while (true) {
      this.#elementForListeners.dispatchEvent(new CustomEvent('reconnecting', {}));
      try {
        console.log('Reconnecting');
        await this.#connect();
        break;
      } catch (e) {
        console.error(e);
        this.#elementForListeners.dispatchEvent(new CustomEvent('reconnect-failed', {detail: e}));
      }
      await wait(reconnectWait);
      reconnectWait = Math.min(reconnectWait + 200, 5000);
    }
  }

  isConnected() {
    return !!this.#characteristic;
  }

  async writeValue(value) {
    if (!this.isConnected()) {
      throw Error(`Bluetooth not connected`);
    }

    this.#latestValueToWrite = value;
    this.#writePromise = this.#writePromise
      .then(async () => {
        if (value === this.#latestValueToWrite && value !== this.#currentValue) {
          // if (this.#currentValue === 0) {
          //   let startUpBoostValue = clamp(value * 1.1, -1, 1);
          //   console.log('Sending start up boost: ' + startUpBoostValue);
          //   await this.#characteristic.writeValue(new TextEncoder('utf-8').encode(startUpBoostValue));
          //   await wait(10);
          // }
          console.log('Sending: ' + value);
          await this.#characteristic.writeValue(new TextEncoder('utf-8').encode(value));
          this.#currentValue = value;
          await wait(20);
        }
      })
      .catch(console.error);
    return this.#writePromise;
  }

  addEventListener(type, listener) {
    this.#elementForListeners.addEventListener(type, listener);
  }

  removeEventListener(type, listener) {
    this.#elementForListeners.addEventListener(type, listener);
  }
}

class Slider {
  #elementForListeners = document.createElement('div');
  #lastTriggerTarget = null;

  #steps = [];
  #middleIndex = null;

  constructor(element, {options, middle = null}) {
    if (middle === null) {
      this.#middleIndex = (options.length - 1) / 2;
    }
    for (const option of options) {
      const stepElement = document.createElement('div');
      stepElement.classList.add('step', 'd-flex', 'justify-content-center', 'align-items-center', 'flex-grow-1');
      stepElement.setAttribute('slider-value', option.value);
      stepElement.setAttribute('slider-background-color', option.backgroundColor);
      stepElement.innerHTML = `<span class="label text-right">${option.label}</span>`;
      element.append(stepElement);
      this.#steps.push({
        element: stepElement,
        options: option,
      });
    }

    const mouseDown = (event) => {
      element.addEventListener('mousemove', mouseMove);
      element.addEventListener('touchmove', touchMove);

      element.addEventListener('mouseup', mouseUp);
      element.addEventListener('touchend', mouseUp);

      this.#triggerChangeEvent(event.target);
    };

    const mouseMove = event => {
      this.#triggerChangeEvent(event.target);
    };

    const touchMove = event => {
      const touch = event.touches[0];
      const target = document.elementFromPoint(touch.pageX, touch.pageY);
      this.#triggerChangeEvent(target);
    };

    const mouseUp = () => {
      element.removeEventListener('mousemove', mouseMove);
      element.removeEventListener('touchmove', touchMove);

      element.removeEventListener('mouseup', mouseUp);
      element.removeEventListener('touchend', mouseUp);
    };

    element.addEventListener('mousedown', mouseDown);
    element.addEventListener('touchstart', mouseDown);
  }

  setValue(value, forceTrigger = false) {
    for (const step of this.#steps) {
      if (step.options.value === value) {
        this.#triggerChangeEvent(step.element, forceTrigger);
        break;
      }
    }
  }

  addEventListener(type, listener) {
    this.#elementForListeners.addEventListener(type, listener);
  }

  removeEventListener(type, listener) {
    this.#elementForListeners.addEventListener(type, listener);
  }

  #triggerChangeEvent(target, forceTrigger = false) {
    if (!target) {
      return;
    }
    while (!target.classList.contains('step')) {
      if (!target) {
        return;
      }
      target = target.parentElement;
    }
    if (!forceTrigger && target === this.#lastTriggerTarget) {
      return;
    }
    this.#lastTriggerTarget = target;

    const stepElementIndex = this.#steps.findIndex((step) => step.element === target);
    for (let i = 0; i < this.#steps.length; i++) {
      const step = this.#steps[i];
      if (i >= stepElementIndex && i <= this.#middleIndex || i <= stepElementIndex && i >= this.#middleIndex) {
        step.element.classList.add('active');
        step.element.style.setProperty('background-color', step.element.getAttribute('slider-background-color'));
      } else {
        step.element.classList.remove('active');
        step.element.style.setProperty('background-color', '');
      }
    }

    const rawValue = target.getAttribute('slider-value');
    const event = new CustomEvent('change', {
      detail: {
        target,
        rawValue,
        value: isNaN(parseFloat(rawValue)) ? rawValue : parseFloat(rawValue),
      },
    });
    this.#elementForListeners.dispatchEvent(event);
  }
}
