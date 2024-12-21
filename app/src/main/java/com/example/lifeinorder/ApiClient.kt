package com.example.lifeinorder

import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.engine.android.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.json.Json

class ApiClient {
    companion object {
        private val client = HttpClient(Android) {
            install(ContentNegotiation) {
                json(Json {
                    prettyPrint = true
                    isLenient = true
                    ignoreUnknownKeys = true
                })
            }
        }

        private val baseUrl = "https://eab6-147-235-207-37.ngrok-free.app"

        suspend fun saveDay(): String {
            val message: SaveResponse = client.get("$baseUrl/hey").body()
            return message.content
        }
    }
}