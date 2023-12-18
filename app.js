const araİnput = document.querySelector("#değerİnput")
const diller = document.querySelector("#diller")
const anaSayfa = document.querySelector("#container")
const araButon = document.querySelector("#araButon").addEventListener("click", haberAra)
const anaİkon = document.querySelector("#anaİkon").addEventListener("click", sayfaGirişi)
const gündemTuş = document.querySelector("#gündem").addEventListener("click", () => tuşlar("gündem"))
const ekonomiTuş = document.querySelector("#ekonomi").addEventListener("click", () => tuşlar("ekonomi"))
const dünyaTuş = document.querySelector("#dünya").addEventListener("click", () => tuşlar("dünya"))
const sporTuş = document.querySelector("#spor").addEventListener("click", () => tuşlar("spor"))
const siyasetTuş = document.querySelector("#siyaset").addEventListener("click", () => tuşlar("siyaset"))
const bilimTuş = document.querySelector("#bilimvetek").addEventListener("click", () => tuşlar("bilim ve teknoloji"))
const otomotivTuş = document.querySelector("#otomotiv").addEventListener("click", () => tuşlar("otomotiv"))
const eğitimTuş = document.querySelector("#eğitim").addEventListener("click", () => tuşlar("eğitim"))
const solTuş = document.querySelector("#solButon").addEventListener("click", () => sayfaTuşları("sol", sayfaDeğeri))
const ortaTuş = document.querySelector("#ortaButon")
const sağTuş = document.querySelector("#sağButon").addEventListener("click", () => sayfaTuşları("sağ", sayfaDeğeri))
document.addEventListener("DOMContentLoaded", sayfaGirişi)
let sayfa = 1
let sayfaDeğeri = ""
let anahtarKelime = ""
let sayfaSayısı = ""
function sayfaGirişi() {
    //sayfa yüklenince çalışır
    araİnput.value=""
    sayfa=1
    ortaTuş.textContent = sayfa
    sayfaDeğeri = "ana"
    anaSayfa.innerHTML = ""
    listele("haberler", tarih(), diller.value, sayfa)
}
function tuşlar(kelime) {
    //navbar tuşları çalıştırır
    sayfa=1
    ortaTuş.textContent = sayfa
    anahtarKelime=kelime
    sayfaDeğeri = "tuş"
    anaSayfa.innerHTML = ""
    araİnput.value = ""
    listele(kelime, tarih(), diller.value, sayfaTuşları())
}
function haberAra() {
    //haberleri girilen kelimeye göre arar
    if (araİnput.value !== "") {
        sayfa=1
        ortaTuş.textContent = sayfa
        sayfaDeğeri = "ara"
        anaSayfa.innerHTML = ""
        listele(araİnput.value, tarih(), diller.value, sayfaTuşları())
    }
}
async function listele(kelime, tarih, dil, sayfa) {
    const response = await fetch(`https://newsapi.org/v2/everything?q=${kelime}&from=${tarih}&language=${dil}&page=${sayfa}&sortBy=publishedAt&apiKey=1986bb11c9264e8abc1c90aea02b09d1`)
    const data = await response.json()
    console.log(Math.floor(data.totalResults/100));
    sayfaSayısı = Math.floor(data.totalResults/100)
    data.articles.forEach((haber) => {
        kartOluştur(haber)
    })
}
function tarih() {
    const tarih = new Date()
    return `${tarih.getFullYear()}-${tarih.getMonth()}-${tarih.getDate()}`
}
function kartOluştur(data) {
    const a = document.createElement("a")
    a.href = data.url
    a.className = "text-decoration-none text-black"
    a.target = "_blank"
    const card = document.createElement("div")
    card.className = "card col-sm-5 col-md-5 col-lg-3 m-2 border border-dark"

    const img = document.createElement("img")
    img.className = "card-img-top"
    img.src = data.urlToImage
    img.alt = "haber görseli"

    const div = document.createElement("div")
    div.className = "card-body d-flex align-content-between flex-wrap fw-bold"

    const başlık = document.createElement("div")
    başlık.className = "card-text fs-5"
    başlık.textContent = data.title

    const kaynak = document.createElement("div")
    kaynak.classList = "card-text fs-6 bg-danger text-white p-2 rounded-pill mt-2"
    kaynak.textContent = `Kaynak : ${data.source.name}`
    a.appendChild(başlık)
    div.appendChild(a)
    div.appendChild(kaynak)
    card.appendChild(img)
    card.appendChild(div)
    anaSayfa.appendChild(card)
}
function sayfaTuşları(yön, kelime) {
    if (kelime == "ana") {
        listele("haberler", tarih(), diller.value, sayfaSırası(yön))
    } else if (kelime == "ara") {
        listele(araİnput.value, tarih(), diller.value, sayfaSırası(yön))
    } else if (kelime == "tuş") {
        listele(anahtarKelime, tarih(), diller.value, sayfaSırası(yön))
    }
}
function sayfaSırası(yön) {
    anaSayfa.innerHTML = ""
    if (yön == "sol" && sayfa !== 1) {
        sayfa -= 1
        ortaTuş.textContent = sayfa
        return sayfa
    } else if (yön == "sağ" && sayfa<sayfaSayısı ) {
        sayfa += 1
        ortaTuş.textContent = sayfa
        return sayfa
    }
}