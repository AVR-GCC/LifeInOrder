package com.example.lifeinorder

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.DateRange
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import java.text.SimpleDateFormat
import java.util.*

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    LifeInOrderApp()
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LifeInOrderApp() {
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
    val habitStatus = remember { mutableStateMapOf<String, HabitStatus>() }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("LifeInOrder") },
                colors = TopAppBarDefaults.smallTopAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primaryContainer,
                    titleContentColor = MaterialTheme.colorScheme.onPrimaryContainer
                )
            )
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .padding(innerPadding)
                .padding(16.dp)
                .verticalScroll(rememberScrollState())
        ) {
            // Date Selector
            DateSelector(selectedDate) { selectedDate = it }

            Spacer(modifier = Modifier.height(16.dp))

            // Habits
            Text("Habits", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
            HabitTracker(habits, habitStatus)

            Spacer(modifier = Modifier.height(16.dp))

            // Text Summary
            OutlinedTextField(
                value = summary,
                onValueChange = { summary = it },
                label = { Text("Summary") },
                modifier = Modifier.fillMaxWidth()
            )

            Spacer(modifier = Modifier.height(16.dp))

            // Meal Tracker
            OutlinedTextField(
                value = food,
                onValueChange = { food = it },
                label = { Text("Food") },
                modifier = Modifier.fillMaxWidth()
            )

            Spacer(modifier = Modifier.height(16.dp))

            // Location Selector
            OutlinedTextField(
                value = location,
                onValueChange = { location = it },
                label = { Text("Location") },
                modifier = Modifier.fillMaxWidth()
            )

            Spacer(modifier = Modifier.height(16.dp))

            // Save Button
            Button(
                onClick = { /* TODO: Implement save functionality */ },
                modifier = Modifier.align(Alignment.End)
            ) {
                Text("Save")
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DateSelector(selectedDate: Date, onDateSelected: (Date) -> Unit) {
    var showDatePicker by remember { mutableStateOf(false) }
    val dateFormatter = remember { SimpleDateFormat("MMMM d, yyyy", Locale.getDefault()) }

    Row(verticalAlignment = Alignment.CenterVertically) {
        Text(
            text = dateFormatter.format(selectedDate),
            style = MaterialTheme.typography.titleLarge
        )
        IconButton(onClick = { showDatePicker = true }) {
            Icon(Icons.Default.DateRange, contentDescription = "Select Date")
        }
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
                    Text("OK")
                }
            },
            dismissButton = {
                TextButton(onClick = { showDatePicker = false }) {
                    Text("Cancel")
                }
            }
        ) {
            DatePicker(state = datePickerState)
        }
    }
}

enum class HabitStatus { Successful, PartiallySuccessful, Unsuccessful }

@Composable
fun HabitTracker(habits: List<String>, habitStatus: MutableMap<String, HabitStatus>) {
    Column {
        habits.forEach { habit ->
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(habit, modifier = Modifier.weight(1f))
                HabitStatusButtons(
                    currentStatus = habitStatus[habit] ?: HabitStatus.Unsuccessful,
                    onStatusChanged = { status -> habitStatus[habit] = status }
                )
            }
        }
    }
}

@Composable
fun HabitStatusButtons(currentStatus: HabitStatus, onStatusChanged: (HabitStatus) -> Unit) {
    Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
        HabitStatusButton(
            status = HabitStatus.Successful,
            color = Color.Green,//MaterialTheme.colorScheme.tertiary,
            isSelected = currentStatus == HabitStatus.Successful,
            onClick = { onStatusChanged(HabitStatus.Successful) }
        )
        HabitStatusButton(
            status = HabitStatus.PartiallySuccessful,
            color = Color.Yellow,//MaterialTheme.colorScheme.secondary,
            isSelected = currentStatus == HabitStatus.PartiallySuccessful,
            onClick = { onStatusChanged(HabitStatus.PartiallySuccessful) }
        )
        HabitStatusButton(
            status = HabitStatus.Unsuccessful,
            color = Color.Red,//MaterialTheme.colorScheme.error,
            isSelected = currentStatus == HabitStatus.Unsuccessful,
            onClick = { onStatusChanged(HabitStatus.Unsuccessful) }
        )
    }
}

@Composable
fun HabitStatusButton(
    status: HabitStatus,
    color: Color,
    isSelected: Boolean,
    onClick: () -> Unit
) {
    Button(
        onClick = onClick,
        colors = ButtonDefaults.buttonColors(
            containerColor = if (isSelected) color else color.copy(alpha = 0.3f)
        ),
        modifier = Modifier.size(25.dp),
        contentPadding = PaddingValues(5.dp)
    ) {
        Icon(
            imageVector = when (status) {
                HabitStatus.Successful -> Icons.Default.Check
                HabitStatus.PartiallySuccessful -> Icons.Default.Star
                HabitStatus.Unsuccessful -> Icons.Default.Close
            },
            contentDescription = status.name,
            tint = if (isSelected) MaterialTheme.colorScheme.onPrimary else MaterialTheme.colorScheme.onSurface
        )
    }
}