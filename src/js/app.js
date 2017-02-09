function getYear () {
  return new Date().getFullYear()
}

function setCopyrightYear () {
  var copyrightSpan = document.querySelector('.js-copyright-year')
  copyrightSpan.innerText = getYear()
}

(function() {
  console.log('Agathist')
  setCopyrightYear()
})()
