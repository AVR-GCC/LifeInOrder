package com.example.lifeinorder

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import java.text.SimpleDateFormat
import java.util.*
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.ui.text.TextStyle

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            LifeInOrderApp()
        }
    }
}

enum class HabitState {
    Unfilled, Fail, Neutral, Success
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LifeInOrderApp() {
    val backgroundColor = Color.Black
    val primaryColor = Color(0xFF00B8D4)  // Less saturated cyan

    var selectedDate by remember { mutableStateOf(Date()) }
    var summary by remember { mutableStateOf("") }
    var food by remember { mutableStateOf("") }
    var location by remember { mutableStateOf("") }
    val habits = listOf(
        "Alcohol",
        "Tobacco",
        "Weed",
        "Diet",
        "Caffeine",
        "Sex",
        "Exercise",
        "Cold Shower",
        "Meditation",
        "Screen Break",
        "Nose Picking"
    )
    val habitStatus = remember { mutableStateMapOf<String, HabitState>() }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(backgroundColor)
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp)
        ) {
            // App Title
            Text(
                text = "LifeInOrder",
                fontSize = 28.sp,
                fontWeight = FontWeight.Bold,
                color = primaryColor,
                modifier = Modifier.padding(bottom = 16.dp)
            )

            // Date Selector
            CustomDateSelector(selectedDate, onDateSelected = { selectedDate = it })

            Spacer(modifier = Modifier.height(16.dp))

            // Habit Tracker (horizontal)
            CustomHabitTracker(habits, habitStatus)

            Spacer(modifier = Modifier.height(16.dp))

            // Location Selector
            CustomSingleLineTextField(
                value = location,
                onValueChange = { location = it },
                label = "Location",
                modifier = Modifier.fillMaxWidth()
            )

            Spacer(modifier = Modifier.height(16.dp))

            // Text Summary (larger, flexible)
            CustomTextField(
                value = summary,
                onValueChange = { summary = it },
                label = "Summary",
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f, fill = false)
            )

            Spacer(modifier = Modifier.height(16.dp))

            // Food Input (single line)
            CustomSingleLineTextField(
                value = food,
                onValueChange = { food = it },
                label = "Food",
                modifier = Modifier.fillMaxWidth()
            )

            Spacer(modifier = Modifier.height(16.dp))

            // Save Button
            CustomButton(
                onClick = { /* TODO: Implement save functionality */ },
                text = "Save",
                modifier = Modifier.align(Alignment.End)
            )
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CustomDateSelector(selectedDate: Date, onDateSelected: (Date) -> Unit) {
    val dateFormatter = remember { SimpleDateFormat("MMMM d, yyyy", Locale.getDefault()) }
    var showDatePicker by remember { mutableStateOf(false) }

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(8.dp))
            .background(Color(0xFF00B8D4).copy(alpha = 0.1f))
            .clickable { showDatePicker = true }
            .padding(vertical = 12.dp, horizontal = 16.dp)
    ) {
        Text(
            text = dateFormatter.format(selectedDate),
            fontSize = 18.sp,
            fontWeight = FontWeight.Medium,
            color = Color(0xFF00B8D4),
            textAlign = TextAlign.Center,
            modifier = Modifier.fillMaxWidth()
        )
    }

    if (showDatePicker) {
        val datePickerState = rememberDatePickerState(initialSelectedDateMillis = selectedDate.time)
        DatePickerDialog(
            onDismissRequest = { showDatePicker = false },
            confirmButton = {
                TextButton(onClick = {
                    showDatePicker = false
                    datePickerState.selectedDateMillis?.let {
                        onDateSelected(Date(it))
                    }
                }) {
                    Text("OK", color = Color(0xFF00B8D4))
                }
            },
            dismissButton = {
                TextButton(onClick = { showDatePicker = false }) {
                    Text("Cancel", color = Color(0xFF00B8D4))
                }
            }
        ) {
            DatePicker(
                state = datePickerState,
                colors = DatePickerDefaults.colors(
                    containerColor = Color.Black,
                    titleContentColor = Color(0xFF00B8D4),
                    headlineContentColor = Color(0xFF00B8D4),
                    weekdayContentColor = Color(0xFF00B8D4),
                    subheadContentColor = Color(0xFF00B8D4),
                    yearContentColor = Color(0xFF00B8D4),
                    currentYearContentColor = Color(0xFF00B8D4),
                    selectedYearContainerColor = Color(0xFF00B8D4),
                    selectedYearContentColor = Color.Black,
                    dayContentColor = Color(0xFF00B8D4),
                    selectedDayContainerColor = Color(0xFF00B8D4),
                    selectedDayContentColor = Color.Black,
                    todayContentColor = Color(0xFF00B8D4),
                    todayDateBorderColor = Color(0xFF00B8D4)
                )
            )
        }
    }
}

@Composable
fun CustomHabitTracker(habits: List<String>, habitStatus: MutableMap<String, HabitState>) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
    ) {
        Divider(color = Color.Gray.copy(alpha = 0.3f), thickness = 1.dp)
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(80.dp)
        ) {
            LazyRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp),
                modifier = Modifier.fillMaxSize()
            ) {
                items(habits) { habit ->
                    HabitItem(
                        habit = habit,
                        state = habitStatus[habit] ?: HabitState.Unfilled,
                        onStateChange = { habitStatus[habit] = it }
                    )
                    if (habit != habits.last()) {
                        Divider(
                            color = Color.Gray.copy(alpha = 0.3f),
                            modifier = Modifier
                                .width(1.dp)
                                .height(60.dp)
                        )
                    }
                }
            }
        }
        Divider(color = Color.Gray.copy(alpha = 0.3f), thickness = 1.dp)
    }
}

@Composable
fun HabitItem(habit: String, state: HabitState, onStateChange: (HabitState) -> Unit) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier
            .width(80.dp)
            .padding(vertical = 4.dp)
    ) {
        Text(
            text = habit,
            fontSize = 12.sp,
            color = Color.White,
            textAlign = TextAlign.Center,
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(modifier = Modifier.height(4.dp))
        CustomToggleButton(
            state = state,
            onStateChange = onStateChange
        )
    }
}

@Composable
fun CustomTextField(
    value: String,
    onValueChange: (String) -> Unit,
    label: String,
    modifier: Modifier = Modifier
) {
    Column(modifier = modifier) {
        Text(
            text = label,
            fontSize = 14.sp,
            color = Color(0xFF00B8D4),
            modifier = Modifier.padding(bottom = 4.dp)
        )
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f, fill = false)
                .background(Color(0xFF333333), RoundedCornerShape(8.dp))
                .clip(RoundedCornerShape(8.dp))
        ) {
            BasicTextField(
                value = value,
                onValueChange = onValueChange,
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp),
                textStyle = TextStyle(
                    fontSize = 16.sp,
                    color = Color.White
                )
            )
        }
    }
}

@Composable
fun CustomSingleLineTextField(
    value: String,
    onValueChange: (String) -> Unit,
    label: String,
    modifier: Modifier = Modifier
) {
    Column(modifier = modifier) {
        Text(
            text = label,
            fontSize = 14.sp,
            color = Color(0xFF00B8D4),
            modifier = Modifier.padding(bottom = 4.dp)
        )
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(48.dp)
                .background(Color(0xFF333333), RoundedCornerShape(8.dp))
                .clip(RoundedCornerShape(8.dp))
        ) {
            BasicTextField(
                value = value,
                onValueChange = onValueChange,
                singleLine = true,
                modifier = Modifier
                    .fillMaxSize()
                    .padding(horizontal = 16.dp, vertical = 8.dp),
                textStyle = TextStyle(
                    fontSize = 16.sp,
                    color = Color.White
                )
            )
        }
    }
}

@Composable
fun CustomToggleButton(
    state: HabitState,
    onStateChange: (HabitState) -> Unit,
    modifier: Modifier = Modifier
) {
    val color = when (state) {
        HabitState.Unfilled -> Color.Gray
        HabitState.Fail -> Color.Red
        HabitState.Neutral -> Color.Yellow
        HabitState.Success -> Color.Green
    }

    Box(
        modifier = modifier
            .size(40.dp)
            .border(1.dp, Color.Gray.copy(alpha = 0.5f), RoundedCornerShape(6.dp))
            .padding(2.dp)
            .background(color, RoundedCornerShape(4.dp))
            .clip(RoundedCornerShape(4.dp))
            .clickable {
                val nextState = when (state) {
                    HabitState.Unfilled -> HabitState.Fail
                    HabitState.Fail -> HabitState.Neutral
                    HabitState.Neutral -> HabitState.Success
                    HabitState.Success -> HabitState.Unfilled
                }
                onStateChange(nextState)
            }
    )
}

@Composable
fun CustomButton(
    onClick: () -> Unit,
    text: String,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(8.dp))
            .background(Color(0xFF00B8D4))
            .clickable(onClick = onClick)
            .padding(horizontal = 16.dp, vertical = 8.dp)
    ) {
        Text(
            text = text,
            color = Color.Black,
            fontSize = 16.sp,
            fontWeight = FontWeight.Medium
        )
    }
}