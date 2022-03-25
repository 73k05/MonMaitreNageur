import React from 'react';
import {SendIcon} from './components';

export const settings = {
  icon: (props: any) => {
    switch (props.name) {
      case 'send':
        return <SendIcon {...props} />;
    }
  },
};

export default settings;
