/**
 * base64 to blob
 * @param base64
 * @param type
 * @return {Promise<Blob | Promise<Blob>>}
 */
export default function base64ToBlob (base64, type = 'application/octet-stream') {
  return fetch(`data:${type};base64,${base64}`).then((res) => res.blob())
}
