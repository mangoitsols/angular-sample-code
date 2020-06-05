export class Init {
    load() {
      if(localStorage.getItem('meeting') === null || localStorage.getItem('meeting') == undefined) {
        console.log('No meeting Found... Creating...');
        let meet = [
        ];  
        localStorage.setItem('meeting', JSON.stringify(meet));
        return 
      } else {
        console.log('Found meeting...');
      }
    }
  }