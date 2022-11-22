package com.raspa.propertymanagementbackend.Utils;

import java.util.Random;

public class RandomUtil {

    public static String generateRandomActivationCode()
    {
        String out_str;

        byte[] byte_arry = new byte[16];    // 16-characters
        int randInt = 0;

        Random rand_generator = new Random();

        for( int ii = 0 ; ii < 16 ; ii++) {
            randInt = rand_generator.nextInt(62);  // 10 + 26 + 26 = 62  , gives range [0-61]
            if( randInt <= 9) {
                byte_arry[ii] = (byte) ((randInt + 48) & 0xFF);         //digits
            } else {
                if( randInt > 9 && randInt <= 35) {
                    byte_arry[ii] = (byte) ((randInt + 55) & 0xFF); //uppercase letters
                } else {
                    byte_arry[ii] = (byte) ((randInt + 61) & 0xFF); //lowercase letters
                }
            }
        }
        out_str = new String(byte_arry);

        return out_str;
    }
}
