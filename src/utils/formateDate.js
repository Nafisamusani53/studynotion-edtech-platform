
export const formatedate = (timestamp, duration) => {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octomber", "November", "December"]
    let date = timestamp.split('T')[0].split('-');

   let mon = parseInt(date[1])
   
   
   return `${month[mon]} ${date[2]}th ${date[0]}`
    

}