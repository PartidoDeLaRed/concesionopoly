function Lugar (marker, monto, rubro) {
    this.marker = marker;
    monto = parseFloat(monto.split(".").join("").split(",").join("."));
    if (!isNaN(monto)){
    	this.monto = monto;
    } else {
    	this.monto = 0;
    }
    this.rubro = rubro;

    
}