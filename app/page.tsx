'use client'

import { Container, Button, Form, Card, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import type { WeatherData } from "@/types/weather";
import { WeatherSearch } from "@/actions";
import type { JournalEntry } from "@/types/journal";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {

  const [error, setError] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [note, setNote] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchJournals = async () => {
    try {
      const res = await fetch("/api/journals", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch journals");
      }

      const data = await res.json();
      setJournals(data);
    } catch (error) {
      console.error("Failed to fetch journals:", error);
    }
  };
  useEffect(() => {
    fetchJournals();
  }, []);

  const WeatherSearchData = async (formData: FormData) => {
    setError("");

    const city = formData.get("city")?.toString() || "";

    console.log("Weather search initiated");

    const { data, error: weatherError } = await WeatherSearch(city);

    if (weatherError) {
      setError(weatherError);
      setWeather(null);
    }

    if (data) {
      setWeather(data);
    }
  };

  const saveJournal = async () => {
    if (!weather || !note.trim()) {
      setError("Please search for a city and write a note.");
      return;
    }

    try {
      const journalData = {
        city: weather.name,
        temperature: weather.main.temp,
        weather: weather.weather[0].main,
        description: weather.weather[0].description,
        note: note.trim(),
      };

      const url = editingId
        ? `/api/journals/${editingId}`
        : "/api/journals";

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(journalData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to save journal");
      }

      setNote("");
      setEditingId(null);
      setError("");

      await fetchJournals();

    } catch (error) {
      console.error("Save journal error:", error);
      setError(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  const deleteJournal = async (id: number) => {
    try {
      const res = await fetch(`/api/journals/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to delete journal");
      }

      await fetchJournals();

      if (editingId === id) {
        setEditingId(null);
        setNote("");
      }

    } catch (error) {
      console.error("Delete journal error:", error);
      setError(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };


  return (
    <Container
      fluid
      className="min-vh-100 py-5"
      style={{ backgroundColor: "#4d91f0" }}
    >
      <Row className="justify-content-center g-4">

        {/* LEFT COLUMN: WEATHER APP */}
        <Col xs={12} md={6} lg={5}>

          <h2 className="text-white mb-4">Weather App</h2>

          {/* Weather Search Form */}
          <Form
            action={WeatherSearchData}
            className="p-4 rounded bg-white"
          >
            <Form.Group className="mb-3">
              <Form.Label>Input City Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city name"
                name="city"
              />
            </Form.Group>

            <Button type="submit" className="w-100">
              Get Weather
            </Button>
          </Form>

          {/* Error Message */}
          {error && (
            <p className="text-danger mt-3">{error}</p>
          )}

          {/* Weather Card */}
          {weather && (
            <Card className="mt-4">
              <Card.Body>
                <Card.Title>{weather.name}</Card.Title>

                <Card.Subtitle className="mb-2 text-muted">
                  {weather.weather[0].main}
                </Card.Subtitle>

                <Card.Text>
                  Temperature: {weather.main.temp}°C<br />
                  Feels Like: {weather.main.feels_like}°C<br />
                  Humidity: {weather.main.humidity}%<br />
                  Wind Speed: {weather.wind.speed} m/s<br />
                  Description: {weather.weather[0].description}
                  <br />

                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                    alt="Weather Icon"
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          )}

          {/* Your Notes */}
          {weather && (
            <Card className="mt-4 p-3">
              <Card.Title>Your Notes</Card.Title>

              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write your note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />

              <Button className="mt-3" onClick={saveJournal}>
                {editingId ? "Update Note" : "Add to Notes"}
              </Button>
            </Card>
          )}
        </Col>

        {/* RIGHT COLUMN: MY NOTES */}
        <Col xs={12} md={6} lg={5}>

          <h2 className="text-white mb-4">My Notes</h2>

          {journals.length === 0 && (
            <Card className="p-4 text-center">
              No journal entries yet.
            </Card>
          )}

          {journals.map((journal) => (
            <Card key={journal.id} className="mb-3">
              <Card.Body>
                <Card.Title>{journal.city}</Card.Title>

                <Card.Text>
                  {journal.temperature}°C - {journal.weather}
                  <br />
                  {journal.description}
                  <br />
                  {journal.note}
                  <br />

                  <small className="text-muted">
                    {new Date(journal.createdAt).toLocaleString()}
                  </small>
                </Card.Text>

                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => {
                    setNote(journal.note);
                    setEditingId(journal.id);
                  }}
                >
                  Edit
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  className="ms-2"
                  onClick={() => deleteJournal(journal.id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))}

        </Col>
      </Row>
    </Container>
  );
}
