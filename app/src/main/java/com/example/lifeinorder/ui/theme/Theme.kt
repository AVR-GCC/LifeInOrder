package com.example.lifeinorder.ui.theme

import android.app.Activity
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext

//import android.app.Activity
//import android.os.Build
//import androidx.compose.foundation.isSystemInDarkTheme
//import androidx.compose.material3.MaterialTheme
//import androidx.compose.material3.darkColorScheme
//import androidx.compose.material3.dynamicDarkColorScheme
//import androidx.compose.material3.dynamicLightColorScheme
//import androidx.compose.material3.lightColorScheme
//import androidx.compose.runtime.Composable
//import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.Color
//import androidx.compose.ui.graphics.toArgb
//import androidx.compose.ui.platform.LocalContext
//import androidx.compose.ui.platform.LocalView
//import androidx.core.view.WindowCompat

private val DarkColorScheme = darkColorScheme(
    primary = Color(0xFF00E5FF),
    onPrimary = Color.Black,
    primaryContainer = Color(0xFF005F6B),
    onPrimaryContainer = Color(0xFFB3EBFF),
    secondary = Color(0xFF00B8D4),
    onSecondary = Color.Black,
    secondaryContainer = Color(0xFF004F5A),
    onSecondaryContainer = Color(0xFFA6EEFF),
    tertiary = Color(0xFF4DD0E1),
    onTertiary = Color.Black,
    tertiaryContainer = Color(0xFF00464F),
    onTertiaryContainer = Color(0xFFBBECF2),
    background = Color(0xFF121212),
    onBackground = Color.White,
    surface = Color(0xFF121212),
    onSurface = Color.White
)

private val LightColorScheme = lightColorScheme(
    primary = Color(0xFF006A77),
    onPrimary = Color.White,
    primaryContainer = Color(0xFFB3EBFF),
    onPrimaryContainer = Color(0xFF001F25),
    secondary = Color(0xFF006A77),
    onSecondary = Color.White,
    secondaryContainer = Color(0xFFA6EEFF),
    onSecondaryContainer = Color(0xFF001F25),
    tertiary = Color(0xFF006A77),
    onTertiary = Color.White,
    tertiaryContainer = Color(0xFFBBECF2),
    onTertiaryContainer = Color(0xFF001F25),
    background = Color.White,
    onBackground = Color.Black,
    surface = Color.White,
    onSurface = Color.Black
)

@Composable
fun LifeInOrderTheme(
    darkTheme: Boolean = true, // isSystemInDarkTheme(),
    // Dynamic color is available on Android 12+
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        }

        darkTheme -> DarkColorScheme
        else -> LightColorScheme
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}