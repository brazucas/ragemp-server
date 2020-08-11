const _SET_NOTIFICATION_COLOR_NEXT = "0x39BBF623FC803EAC";
const _SET_NOTIFICATION_BACKGROUND_COLOR = "0x92F0DA1E27DB96DC";

mp.events.add("BN_Show", (message, flashing = false, textColor = -1, bgColor = -1, flashColor = [77, 77, 77, 200]) => {
    if (textColor > -1) mp.game.invoke(_SET_NOTIFICATION_COLOR_NEXT, textColor);
    if (bgColor > -1) mp.game.invoke(_SET_NOTIFICATION_BACKGROUND_COLOR, bgColor);
    if (flashing) mp.game.ui.setNotificationFlashColor(flashColor[0], flashColor[1], flashColor[2], flashColor[3]);

    mp.game.gxt.set("BNOTIF_LONG_TEXT_ENTRY", `~a~${message}`);
    mp.game.ui.setNotificationTextEntry("BNOTIF_LONG_TEXT_ENTRY");
    mp.game.ui.addTextComponentSubstringPlayerName(""); // needed for text color to work
    mp.game.ui.drawNotification(flashing, true);
});

mp.events.add("BN_ShowWithPicture", (title, sender, message, notifPic, icon = 0, flashing = false, textColor = -1, bgColor = -1, flashColor = [77, 77, 77, 200]) => {
    if (textColor > -1) mp.game.invoke(_SET_NOTIFICATION_COLOR_NEXT, textColor);
    if (bgColor > -1) mp.game.invoke(_SET_NOTIFICATION_BACKGROUND_COLOR, bgColor);
    if (flashing) mp.game.ui.setNotificationFlashColor(flashColor[0], flashColor[1], flashColor[2], flashColor[3]);

    mp.game.gxt.set("BNOTIF_LONG_TEXT_ENTRY_IMG", `~a~${message}`);
    mp.game.ui.setNotificationTextEntry("BNOTIF_LONG_TEXT_ENTRY_IMG");
    mp.game.ui.addTextComponentSubstringPlayerName(""); // needed for text color to work
    mp.game.ui.setNotificationMessage(notifPic, notifPic, flashing, icon, title, sender);
});

mp.game.ui.notifications = {
    show: (message, flashing = false, textColor = -1, bgColor = -1, flashColor = [77, 77, 77, 200]) => mp.events.call("BN_Show", message, flashing, textColor, bgColor, flashColor),
    showWithPicture: (title, sender, message, notifPic, icon = 0, flashing = false, textColor = -1, bgColor = -1, flashColor = [77, 77, 77, 200]) => mp.events.call("BN_ShowWithPicture", title, sender, message, notifPic, icon, flashing, textColor, bgColor, flashColor)
};