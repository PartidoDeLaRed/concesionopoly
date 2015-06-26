function Lugar (marker, monto, rubro) {
    this.marker = marker;
    monto = parseFloat(monto.replace(".","").replace(",", "."));
    if (monto != NaN){
    	this.monto = monto;
    } else {
    	this.monto = 0;
    }
    
    this.rubro = rubro;
}