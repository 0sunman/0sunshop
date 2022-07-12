export default (data:number):string=>{
    const numberData = String(data);
    return numberData.split("").reverse()
                     .map((char,idx) => (((idx+1) % 3 === 0) && (idx !== numberData.length-1)) ? "," + char : char)
                     .reverse().join("");
}