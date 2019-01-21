import BrightGreeting1 from './bright/greeting1';
import BrightGuestbook1 from './bright/guestBook1';
import BrightMap1 from './bright/map1';
import BrightPhotoalbum1 from './bright/photoAlbum1';

export const getWidgetComponent = (widgetName) => {
    switch (widgetName) {
        case 'BrightGreeting1':
            return BrightGreeting1;
        case 'BrightGuestbook1':
            return BrightGuestbook1;
        case 'BrightMap1':
            return BrightMap1;
        case 'BrightPhotoalbum1':
            return BrightPhotoalbum1;
    }
} 