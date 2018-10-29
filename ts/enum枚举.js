var Days;
(function (Days) {
    Days[Days["Sun"] = 7] = "Sun";
    Days[Days["Mon"] = 5] = "Mon";
    Days[Days["Tue"] = 6] = "Tue";
    Days[Days["Wed"] = 7] = "Wed";
    Days[Days["Thu"] = 8] = "Thu";
    Days[Days["Fri"] = 9] = "Fri";
    Days[Days["Sat"] = 10] = "Sat";
})(Days || (Days = {}));
console.log(Days[7]);
console.log(Days['Sun'] === 0);
