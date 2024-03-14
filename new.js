// const startTimeDay = new Date().getTime() - 72 * 3600 * 1000 , endTime = new Date().getTime(); 
// const startTimeHour = new Date().getTime() - 3 * 3600 * 1000;  
// const startTimeMinute = new Date().getTime() - 180 * 1000;  

// console.log({
// 	startTimeDay, startTimeHour, startTimeMinute, endTime
// })

function showDate(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString('en');
}



const startTime = 1709601728986,
    endTime = 1709601908986;
console.log((endTime - startTime) / 60000, 'Minutes')

const selectedSlot = {
    slotValue: (1000 * 60)
};
const slotValue = selectedSlot['slotValue'];
let nextSubDate = {
        startTime: 1709601728986,
        endTime: 1709601780000
    }
    // console.log({ nextSubDate })
const previousEndTime = 1709601900000;
const subDateRanges = [];


while (nextSubDate['endTime'] <= previousEndTime) {
    subDateRanges.push(nextSubDate);
    nextSubDate = {
        startTime: nextSubDate['endTime'],
        endTime: (nextSubDate['endTime'] + slotValue)
    };
};

(previousEndTime !== endTime) && subDateRanges.push({...nextSubDate,
    endTime
});


subDateRanges.map((date => {
    console.log((date.endTime - date.startTime) / slotValue, {
        date
    }, showDate(date.startTime), showDate(date.endTime))
}))