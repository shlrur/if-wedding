import BrightGreeting1 from './bright/greeting1';
import BrightGuestBook1 from './bright/guestBook1';
import BrightMap1 from './bright/map1';
import BrightPhotoAlbum1 from './bright/photoAlbum1';

export const getWidgetComponent = (widgetName) => {
    switch (widgetName) {
        case 'bright_greeting1':
            return BrightGreeting1;
        case 'bright_guestBook1':
            return BrightGuestBook1;
        case 'bright_map1':
            return BrightMap1;
        case 'bright_photoAlbum1':
            return BrightPhotoAlbum1;
    }
} 