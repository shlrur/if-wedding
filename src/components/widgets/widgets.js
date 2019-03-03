import BrightGreeting1Edit from './edit/bright/greeting1';
import BrightGuestBook1Edit from './edit/bright/guestBook1';
import BrightMap1Edit from './edit/bright/map1';
import BrightPhotoAlbum1Edit from './edit/bright/photoAlbum1';

export const getWidgetComponent = (widgetName) => {
    switch (widgetName) {
        case 'bright_greeting1_edit':
            return BrightGreeting1Edit;
        case 'bright_guestBook1_edit':
            return BrightGuestBook1Edit;
        case 'bright_map1_edit':
            return BrightMap1Edit;
        case 'bright_photoAlbum1_edit':
            return BrightPhotoAlbum1Edit;
    }
};