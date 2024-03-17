///////////////////////////////
// General
///////////////////////////////

// Fix obfuscated save file json keys
function mapKeys(json, mapping) {
  if (Array.isArray(json)) {
    return json.map((item) => mapKeys(item, mapping));
  } else if (typeof json === 'object' && json !== null) {
    const newJson = {};
    for (const key in json) {
      const mappedKey = mapping.find((m) => m.Key === key)?.Value;
      if (mappedKey) {
        newJson[mappedKey] = mapKeys(json[key], mapping);
      } else {
        newJson[key] = mapKeys(json[key], mapping);
      }
    }
    return newJson;
  } else {
    return json;
  }
}

// File upload reading helper
function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
}

///////////////////////////////
// Save Files
///////////////////////////////

// Lz4 stuff

const Buffer = require('buffer').Buffer;
const LZ4 = require('lz4');

// TODO: Make this work
async function compressSave() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (!file) {
    alert('Please select a file.');
    return;
  }

  const data = await readFile(file);
  const compressedData = compress(data);
  downloadFile(compressedData, file.name + '.compressed');
}

// Uploaded file -> json file
async function decompressSave(file, mapping) {
  const fileData = await readFile(file);

  let decodedText = '';
  const size = fileData.byteLength;
  let tell = 0;

  do {
    // Slice the uploaded data for the next block
    const data = fileData.slice(tell);
    // Read No Man's Sky's magic number block
    const magicNumber = new Uint32Array(data, 0, 4)[0];
    // Get info on this block
    const compressedSize = new Uint32Array(data, 4, 4)[0];
    const uncompressedSize = new Uint32Array(data, 8, 4)[0];

    if (magicNumber !== 0xfeeda1e5) {
      alert('Invalid NMS Block, bad file');
      return;
    }

    // Read the current compressed block
    const compressedBlock = new Buffer.from(data.slice(16));

    // Set the uncompressed block up
    let uncompressedBlock = Buffer.alloc(uncompressedSize);
    // Decode the current compressed block
    LZ4.decodeBlock(compressedBlock, uncompressedBlock, 0, compressedSize);
    // Trim the uncompressed block, for reasons
    uncompressedBlock = uncompressedBlock.subarray(0, uncompressedSize);
    // Convert uncompressed block to text and append
    const decodedBlockText = uncompressedBlock.toString();
    decodedText += decodedBlockText;

    // Advance the file reader by the number of bytes we have read so far
    tell += 4 + 4 + 4 + 4 + compressedSize;
  } while (tell < size);

  // Clean up decoded text
  let parsedJson;
  try {
    parsedJson = JSON.parse(decodedText);
  } catch {
    parsedJson = JSON.parse(decodedText.slice(0, -1));
  }
  const mappedJson = mapKeys(parsedJson, mapping);
  return mappedJson;
}
