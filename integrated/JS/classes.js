icons = new Object();

icons["COOPERADORA"] = "../IMG/icons/icon1.png";
icons["PREDIOSCOMERCIALES"] = "../IMG/icons/icon2.png";
icons["GASTRONOMICOS"] = "../IMG/icons/icon3.png";
icons["PERSONASCONNECESIDADESESPECIALES"] = "../IMG/icons/icon4.png";
icons["PLAYASDEESTACIONAMIENTO"] = "../IMG/icons/icon5.png";
icons["DEPORTES"] = "../IMG/icons/icon6.png";
icons["CONTROLVEHICULAR"] = "../IMG/icons/icon7.png";
icons["VARIOS"] = "../IMG/icons/icon9.png";
icons["REPARTICIONESGUBERNAMENTALES"] = "../IMG/icons/icon10.png";
icons["NA"] = "../IMG/icons/icon11.png";
icons["LOCALESBAJOAUTOPISTA"] = "../IMG/icons/icon12.png";
icons["JARDÍNZOOLÓGICO"] = "../IMG/icons/icon13.png";
icons["CALESITAS"] = "../IMG/icons/icon14.png";

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