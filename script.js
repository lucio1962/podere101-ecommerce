function getCarrello() {
  return JSON.parse(localStorage.getItem("carrello") || "[]");
}
function salvaCarrello(carrello) {
  localStorage.setItem("carrello", JSON.stringify(carrello));
}
function aggiungiAlCarrello(nome, prezzo) {
  let carrello = getCarrello();
  let item = carrello.find(i => i.nome === nome);
  if (item) {
    item.qta += 1;
  } else {
    carrello.push({nome, prezzo, qta:1});
  }
  salvaCarrello(carrello);
  alert(nome + " aggiunto al carrello!");
}
function mostraCarrello() {
  const carrello = getCarrello();
  const div = document.getElementById("carrello");
  const totaleDiv = document.getElementById("totale");
  if (!div) return;
  div.innerHTML = "";
  let totale = 0;
  carrello.forEach((item,i) => {
    totale += item.prezzo * item.qta;
    div.innerHTML += `
      <p>${item.qta}x ${item.nome} - €${(item.prezzo*item.qta).toFixed(2)}
      <button onclick="rimuovi(${i})">❌</button></p>`;
  });
  totaleDiv.textContent = "Totale: €" + totale.toFixed(2);
}
function rimuovi(i){
  let carrello = getCarrello();
  carrello.splice(i,1);
  salvaCarrello(carrello);
  mostraCarrello();
}
function svuotaCarrello(){
  salvaCarrello([]);
  mostraCarrello();
}
function checkout(){
  const carrello = getCarrello();
  if (carrello.length === 0) { alert("Carrello vuoto!"); return; }
  let msg = "Ordine Podere 101:\n";
  let totale = 0;
  carrello.forEach(item=>{
    totale += item.prezzo*item.qta;
    msg += `${item.qta}x ${item.nome} - €${(item.prezzo*item.qta).toFixed(2)}\n`;
  });
  msg += "Totale: €" + totale.toFixed(2);
  const url = "https://wa.me/393384461593?text=" + encodeURIComponent(msg);
  window.open(url,"_blank");
}
window.onload = mostraCarrello;
