import LightGreeting1 from './greeting/light_1';
import LightGuestbook1 from './guestBook/light_1';
import LightMap1 from './map/light_1';
import LightPhotoalbum1 from './photoAlbum/light_1';

export const getWidgetComponent = (widgetName) => {
    switch (widgetName) {
        case 'LightGreeting1':
            return LightGreeting1;
        case 'LightGuestbook1':
            return LightGuestbook1;
        case 'LightMap1':
            return LightMap1;
        case 'LightPhotoalbum1':
            return LightPhotoalbum1;
    }
} 