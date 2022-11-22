package com.gyawalibros.teachernepal.Utils;

public class StringUtil {
    public static boolean isNotValid(String s){
        return s == null || s.equals("");
    }

    public static boolean isNotValidDouble(Double d){
        return d == null || d == 0;
    }

    public static boolean isNotValidInteger(Integer i){
        return i == null || i == 0;
    }
}
