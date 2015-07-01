icons = new Object();

icons["COOPERADORA"] = "icons/icon1.png";
icons["PREDIOSCOMERCIALES"] = "icons/icon2.png";
icons["GASTRONOMICOS"] = "icons/icon3.png";
icons["PERSONASCONNECESIDADESESPECIALES"] = "icons/icon4.png";
icons["PLAYASDEESTACIONAMIENTO"] = "icons/icon5.png";
icons["DEPORTES"] = "icons/icon6.png";
icons["CONTROLVEHICULAR"] = "icons/icon7.png";
icons["VARIOS"] = "icons/icon9.png";
icons["REPARTICIONESGUBERNAMENTALES"] = "icons/icon10.png";
icons["NA"] = "icons/icon11.png";
icons["LOCALESBAJOAUTOPISTA"] = "icons/icon12.png";
icons["JARDÍNZOOLÓGICO"] = "icons/icon13.png";
icons["CALESITAS"] = "icons/icon14.png";

function Lugar (monto, rubro) {
    monto = parseFloat(monto.split(".").join("").split(",").join("."));
    if (!isNaN(monto)){
    	this.monto = monto;
    } else {
    	this.monto = 0;
    }

    this.rubro = rubro;

    this.icon = icons[rubro];
    if (this.icon === undefined) {
    	this.icon = ICONO_DEFAULT;
    };
    
}