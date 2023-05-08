/**
 * base64 to blob
 * @param base64
 * @param type
 * @return {Promise<Blob | Promise<Blob>>}
 */
export default function base64ToBlob(
  base64: any,
  type?: string
): Promise<Blob | Promise<Blob>>;
