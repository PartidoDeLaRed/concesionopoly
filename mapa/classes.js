function Lugar (marker, monto, rubro) {
    this.marker = marker;
    this.monto = parseFloat(monto.replace(".","").replace(",", "."));
    this.rubro = rubro;
}