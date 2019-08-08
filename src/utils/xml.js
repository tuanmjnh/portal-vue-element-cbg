export function objectToXml(obj) {
  if (!obj) return
  var xml = ''

  for (var prop in obj) {
    if (!obj.hasOwnProperty(prop)) {
      continue
    }

    if (obj[prop] === undefined) continue

    xml += '<' + prop + '>'
    if (typeof obj[prop] === 'object') {
      xml += objectToXml(new Object(obj[prop]))
    } else {
      xml += obj[prop]
    }
    xml += '</' + prop + '>'
  }

  return xml
}
