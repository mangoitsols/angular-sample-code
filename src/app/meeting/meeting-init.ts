export class Init {
    load() {
      if(localStorage.getItem('meeting') === null || localStorage.getItem('meeting') == undefined) {
        console.log('No meeting Found... Creating...');
        let meet = [
          {
            id:1,
            name:'Tarun Pasangya',            
            meetingDate:'2020-06-15',
            meetingStartTime:'10:20',
            meetingEndTime:'11:20',
            meetingStart:1594788600000,
            meetingEnd:1594792200000,
          }
        ];  
        localStorage.setItem('meeting', JSON.stringify(meet));
        return 
      } else {
        console.log('Found meeting...');
      }
    }
  }