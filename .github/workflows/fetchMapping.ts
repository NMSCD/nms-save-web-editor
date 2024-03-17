type Mapping = { Key: string; Value: string };

interface MappingObject {
  libMBIN_version: string;
  Mapping: Mapping[];
}

const mappingUrl =
  "https://github.com/monkeyman192/MBINCompiler/releases/latest/download/mapping.json";
const fetchedFile = await fetch(mappingUrl);
const fetchedJson: MappingObject = await fetchedFile.json();

Deno.writeTextFileSync("mapping.json", JSON.stringify(fetchedJson));
