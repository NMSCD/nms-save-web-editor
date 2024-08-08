declare global {
  async function decompressSave(file: File, mapping: { Key: string; Value: string }[]): Promise<object | string>;
}

export {};
