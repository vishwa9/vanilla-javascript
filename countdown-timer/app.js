const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const giveaway = document.querySelector('.giveaway');
  const deadline = document.querySelector('.deadline');
  const items = document.querySelectorAll('.deadline-format h4');

  let tempDate = new Date();
  let tempYear = tempDate.getFullYear();
  let tempMonth = tempDate.getMonth();
  let tempDay = tempDate.getDate();
  const futureDate = new Date(tempYear, tempMonth, tempDay+10, 11, 30, 0)
  // let futureDate = new Date(2020, 8, 27, 0, 0, 0);
  
  const year = futureDate.getFullYear();
  const hours = futureDate.getHours();
  const minutes = futureDate.getMinutes();
  let month = futureDate.getMonth();
  month = months[month];
  const date = futureDate.getDate();
  const weekday = weekdays[futureDate.getDay()];
  giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}AM`;

  const futureTime = futureDate.getTime();
  
  const getRemainingtime = () => {
    const today = new Date().getTime();
    const t = futureTime - today;

    const oneDay = 24*60*60*1000;
    const oneHour = 60*60*1000;
    const oneMinute = 60*1000;

    let days = t/oneDay;
    days = Math.floor(days);
    let hours = Math.floor((t % oneDay)/oneHour);
    let minutes = Math.floor((t % oneHour) / oneMinute);
    let seconds = Math.floor((t % oneMinute) / 1000);

    const values = [days, hours, minutes, seconds];

    const format = (item) => {
      if(item < 10) {
        return `0${item}`
      } else {
        return item
      }
    }

    items.forEach((item, index) => {
      item.innerHTML = format(values[index]);
    });

    if(t < 0) {
      clearInterval(countDown);
      deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired</h4>`;
    }
  };

  let countDown = setInterval(getRemainingtime, 1000);

  getRemainingtime();