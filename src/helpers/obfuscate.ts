import type { Mapping } from '../types/mapping';

// obfuscate keys for compression
export function reverseMapKeys(json: object, mapping: Mapping) {
  if (Array.isArray(json)) {
    return json.map((item) => reverseMapKeys(item, mapping));
  } else if (typeof json === 'object' && json !== null) {
    const newJson = {};
    for (const key in json) {
      const mappedKey = mapping.find((m) => m.Value === key)?.Key;
      if (mappedKey) {
        newJson[mappedKey] = reverseMapKeys(json[key], mapping);
      } else {
        newJson[key] = reverseMapKeys(json[key], mapping);
      }
    }
    return newJson;
  } else {
    return json;
  }
}
