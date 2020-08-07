let infoTimoutId = null;

const initButton = document.getElementById('init-button');
const info = document.getElementById('info');
const writeButton = document.getElementById('write-button');
const writeInput = document.getElementById('write-input');

function setInfo(text, {timeout = 4000, type = 'info'} = {}) {
  info.classList.toggle('alert-primary', type === 'info');
  info.classList.toggle('alert-success', type === 'success');
  info.classList.toggle('alert-danger', type === 'error');
  info.innerText = text;
  clearTimeout(infoTimoutId);
  infoTimoutId = setTimeout(() => {
    info.innerText = '';
  }, timeout);
}

async function initNFC() {
  const nfcPermissionState = await nfc.getPermissionState();
  if (nfcPermissionState === 'denied') {
    setInfo(`You permanently blocked reading NFC tags for this site. Please remove this restriction in you Browsers settings.`,
      {type: 'error', timeout: 1000 * 60 * 60 * 24 * 365});
    return;
  }

  try {
    await nfc.initRead();

    initButton.classList.add('d-none');
    [...document.getElementsByClassName('on-init')].forEach((element) => {
      element.classList.remove('d-none');
    });
    document.addEventListener('nfc-read-text', (event) => {
      console.log(event);
      console.log(event.detail.text);

      setInfo(event.detail.text);
    });
    document.addEventListener('nfc-read-error', (event) => {
      console.error(event);

      setInfo(event.detail.message, {type: 'error'});
    });

    setInfo('NFC initialized. Ready to read NFC tags.', {timeout: 2000});
  } catch (e) {
    console.error(e);
    setInfo(e.message, {type: 'error'});

    initButton.classList.remove('d-none');
    [...document.getElementsByClassName('on-init')].forEach((element) => {
      element.classList.add('d-none');
    });
  }
}

initButton.addEventListener('click', () => initNFC());
writeButton.addEventListener('click', async () => {
  const value = writeInput.value;
  try {
    console.log(`Writing value '${value}'`);
    await nfc.writeText(value);
    console.log(`Done`);
    setInfo(`Written "${value}" to NFC tag.`, {type: 'success'});
  } catch (e) {
    console.error(e);
    setInfo(`Failed to write value '${value}' to NFC tag`, {type: 'error'});
  }
});

initNFC();
