export default () => {
  const script = window.document.createElement('script')
  script.type = 'text/javascript'
  script.src = 'https://webapi.amap.com/maps?v=1.4.15&key=4881b4b13c0a8d1e91061233e0f337cf'
  document.getElementById('append').appendChild(script)
  // api.addHTMLHeadScript({
  //   type: 'text/javascript',
  //   src: 'https://webapi.amap.com/maps?v=1.4.15&key=4881b4b13c0a8d1e91061233e0f337cf'
  // })
}
