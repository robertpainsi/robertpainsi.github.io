/* global NDEFReader, NDEFWriter */
/* eslint no-undef: "error" */

/*
 * TODO: Scan (read) only specific id
 * TODO: Scan (read) only specific mediaType
 * TODO: Handle different recordType read
 * TODO: Handle different mediaType read
 * TODO: Read id, etc
 *
 * TODO: Write multiple records
 * TODO: Write id?, recordType, mediaType, etc
 * TODO: ignoreRead while writing (default)
 *
 * TODO: Abort NFC operations https://web.dev/nfc/#abort-nfc-operations
 */
class NFC {

  reader = null;

  async getPermissionState() {
    return (await navigator.permissions.query({name: 'nfc'})).state;
  }

  async initRead() {
    if (await this.getPermissionState() === 'denied') {
      this.reader = null;
      throw new Error(`NFC permission denied`);
    }

    this.reader = new NDEFReader();
    await this.reader.scan();

    this.reader.onreading = (event) => {
      const message = event.message;
      for (const record of message.records) {
        const data = new TextDecoder(record.encoding).decode(record.data); // TODO partially read record causes exception
        document.dispatchEvent(new CustomEvent('nfc-read-text', {
          bubbles: false,
          cancelable: false,
          detail: {
            text: data,
          },
        }));
      }
    };
    this.reader.onerror = (event) => {
      console.log('error');
      document.dispatchEvent(new CustomEvent('nfc-read-error', {
        bubbles: false,
        cancelable: false,
        detail: event,
      }));
    };
  }

  async writeText(text) {
    const writer = new NDEFWriter();
    await writer.write({
      records: [
        {
          recordType: 'text',
          lang: 'en',
          encoding: 'utf-8',
          data: text,
        }],
    });
  }
}

const nfc = new NFC();
