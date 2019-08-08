export function conver(number) {
  var arrMoney = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín']
  var hdv1 = [' ', ' mươi ', ' trăm ', ' nghìn ', ' mươi ', ' trăm ', ' triệu ', ' tỉ ']
  var hdv = [' ', ' mươi ', ' trăm ', ' nghìn ', ' triệu ', ' tỉ ']
  number = number.replace(/\./g, '').replace(/\,/g, '')
  var rs = ''
  var j = 0
  var k = 0
  for (var i = number.length - 1; i >= 0; i--) {
    var tmp = ''
    if (j > 0 && j % 3 === 0) {
      tmp = hdv[k + 3]
      k++
    }
    rs = arrMoney[number[i]] + hdv[j % 3] + tmp + rs

    j++
  }
  rs = rs.replace(/một mươi không/g, 'mười')
  rs = rs.replace(/một mươi/g, 'mười')
  rs = rs.replace(/không trăm không mươi không/g, '')
  rs = rs.replace(/không mươi không/g, '')
  rs = rs.replace(/mươi không/g, 'mươi')
  rs = rs.replace(/không mươi/g, 'linh')
  rs = rs.replace(/  /g, ' ')
  rs = (rs.trim() + 'đồng').capitalize()
  return rs
}
