import React, {createContext, useCallback, useContext, useState} from 'react';
import {Animated, StyleSheet, Text} from 'react-native';
import {POSTION, ToastOptions} from './constants';

export interface ToastContext {
  show: (message: string, options?: ToastOptions) => void;
  hide: () => void;
}

const ToastContext = createContext<ToastContext | undefined>(undefined);

export const useToast = (): ToastContext => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const ToastProvider = ({children}: {children: React.ReactNode}) => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [fadeAnimation] = useState(new Animated.Value(0));
  const [toastOption, setToastOption] = useState<ToastOptions>({
    duration: 2000,
    position: POSTION.BOTTOM,
    containerStyle: {},
    textStyle: {},
  });

  const show = useCallback(
    (message: string, option?: ToastOptions) => {
      if (option) {
        setToastOption(option);
      }
      if (!visible) {
        setMessage(message);
        setVisible(true);
        Animated.timing(fadeAnimation, {
          toValue: 1,
          duration: 618,
          useNativeDriver: true,
        }).start();
        setTimeout(() => {
          hide();
        }, toastOption?.duration);
      }
    },
    [fadeAnimation],
  );

  const hide = useCallback(() => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 618,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      setMessage('');
    });
  }, [fadeAnimation]);

  return (
    <ToastContext.Provider value={{show, hide}}>
      {children}
      {visible && (
        <Animated.View
          style={[
            styles.toastContainer,
            [{top: 120}, {bottom: 120}][toastOption?.position || 1],
            toastOption?.containerStyle,
            {opacity: fadeAnimation},
          ]}>
          <Text style={[styles.toastText, toastOption?.textStyle]}>
            {message}
          </Text>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    position: 'absolute',
    alignSelf: 'center',
    borderRadius: 10,
    maxWidth: 300,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    // iOS 阴影
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0.1},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android 阴影
    elevation: 4,
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ToastProvider;
