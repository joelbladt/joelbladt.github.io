---
title: "Ein Blick in die Zukunft: Neue Features in Laravel 11"
titleImage: "laravel.jpg"
date: 2024-01-30T01:14:13+02:00
draft: false
toc: false
images:
tags:
  - Laravel
author: "Joel Bladt"
---

Obwohl Laravel 11 voraussichtlich erst im ersten Quartal 2024 veröffentlicht wird, möchte ich euch schon mal einen
Vorgeschmack auf einige coole Funktionen geben. Taylor Otwell hat in seiner Laracon-Keynote bereits einige aufregende
Verbesserungen enthüllt, die uns erwarten.

## Überarbeitete Verzeichnisstruktur

Schaut mal, in der aktuellen Beta-Vorschau von Laravel 11 gibt es spannende Änderungen in der Verzeichnisstruktur:

- Controller erweitern standardmäßig nichts mehr.
- Das Middleware-Verzeichnis ist Geschichte. Die vorhandenen Middleware könnt ihr jetzt im `App/ServiceProvider` 
nach Belieben anpassen.
```php
public function boot(): void
{
    EncryptCookies::except(['some_cookie']);
}
```

- Das Http/Kernel wurde gestrichen, und viele Aufgaben, die zuvor im Kernel erledigt wurden, können nun im `Bootstrap/App`
erledigt werden.

```php
return Application::configure()
    ->withProviders()
    -›withRouting(
        web: __DIR__.'/../routes/web.php'
        commands: __DIR__.'/../routes/console.php',
    )
    ->withMiddleware(function(Middleware Smiddleware) {
        $middleware->web(append: LaraconMiddleware::class):
    })
```
## Model casts ändern sich

Die Model Casts wurden nun als Methode definiert, was es ermöglicht, direkt auf andere Methoden von den Casts zuzugreifen.
Ein Beispiel hierzu in Laravel 11:

```php
protected function casts(): array
{
    return [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'options'=› AsEnumCollection::of(UserOption::class),
    ];
}
```

## Vereinheitlichung von Dump-Funktionen

Um den Kern des Frameworks zu optimieren, wurden die "dd" oder "dump" Methoden in mehreren Klassen vereinheitlicht.
Zudem könnt ihr die Dumpable-Eigenschaft in euren eigenen Klassen verwenden:

```php
class Stringable implements JsonSerializable, ArrayAccess
{
    use Conditionable, Dumpable, Macroable, Tappable;
 
    str('foo')->dd();
    str('foo')->dump();
```

## Konfigurationsänderungen

Laravel 11 reduziert die Anzahl der Konfigurationsdateien und integriert alle Optionen in die erweiterte `.env`.
Der neue Befehl `php artisan config:publish` ermöglicht es, Konfigurationen nach Bedarf wiederherzustellen und
nicht benötigte Optionen zu entfernen.

## Schlankere Standard-Migrationen

Neue Laravel-Anwendungen enthalten jetzt nur noch zwei Dateien für Standardmigrationen, die die Daten der Jahre 2014 und 2019 zusammenführen.

## Änderungen in den Routen

Standardmäßig wird es nur noch zwei Routendateien geben: `console.php` und `web.php`. API-Routen werden über
`php artisan install:api` aktiviert, während für WebSocket-Übertragungen `php artisan install:broadcasting` genutzt wird.

## Console Kernel entfernt

Der Console Kernel entfällt und Konsolenbefehle könnt ihr nun direkt in `routes/console.php` definieren.

## Named arguments
Named arguments sind nicht mehr an die Abwärtskompatibilitätsrichtlinien von Laravel gebunden, was eine verbesserte
Flexibilität bei der Nutzung von Funktionsargumenten ermöglicht.

## Eager Load Limit wird integriert

"Eager Load Limit" ist eine Funktion in Laravel 11, die sich auf die effiziente Abfrage von Beziehungen zwischen
Datenbanktabellen konzentriert. In herkömmlichen Eager-Loading-Szenarien werden alle verknüpften Datensätze
gleichzeitig geladen, was zu unnötigem Datenverkehr führt, insbesondere wenn nur eine begrenzte Anzahl von Datensätzen benötigt wird.

Damit können wir vereinfacht die Anzahl der geladenen verknüpften Datensätze pro Beziehung begrenzen.
Dies ermöglicht es, nur die relevanten Daten zu laden und verbessert somit die Leistung und Ressourcennutzung.
Ein einfaches Beispiel könnte die Abfrage von Benutzern mit ihren letzten fünf Artikeln sein:

```php
User::select('id', 'name')->with([
    'articles' => fn($query) => $query->limit(5)
])->get();
```
In diesem Beispiel wird die Beziehung "articles" eager geladen, aber es werden nur die neuesten fünf Artikel für jeden
Benutzer abgerufen. Diese Funktion ist besonders nützlich, um Overhead bei der Datenbankabfrage zu optimieren, indem
nur die benötigten Daten geladen werden.

## Voraussetzung: Mindestens PHP 8.2

Für Laravel 11 stand die Entscheidung bereits früh fest, dass mindestens PHP 8.2 vorausgesetzt wird. Das ist eine gute
Gelegenheit nicht nur die Laravel-Version, sondern auch die PHP-Version zu aktualisieren, wenn man die 
[Unterstützten PHP Versionen]( https://www.php.net/supported-versions.php "Unterstützte Versionen") bedenkt.

<div class="table-responsive">
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>Version</th>
        <th>PHP Version</th>
        <th>Veröffentlichung</th>
        <th>Fehlerbehebungen bis</th>
        <th>Sicherheitsfixes bis</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><a href="https://laravel-news.com/laravel-9" target="_blank" title="Laravel 9">Laravel 9</a></td>
        <td>8.0 - 8.2</td>
        <td>8. Februar 2022</td>
        <td>8. August 2023</td>
        <td>6. Februar 2024</td>
      </tr>
      <tr>
        <td><a href="https://laravel-news.com/laravel-10" target="_blank" title="Laravel 10">Laravel 10</a></td>
        <td>8.1 - 8.2</td>
        <td>Q1 2023</td>
        <td>6. August 2024</td>
        <td>4. Februar 2025</td>
      </tr>
      <tr>
        <td><a href="https://laravel-news.com/laravel-11" target="_blank" title="Laravel 11">Laravel 11</a></td>
        <td>8.2</td>
        <td>Q1 2024</td>
        <td>5. August 2025</td>
        <td>3. Februar 2026</td>
      </tr>
    </tbody>
  </table>
</div>

## Laravel 11 installieren

Obwohl Laravel 11 noch nicht offiziell veröffentlicht ist, könnt ihr es bereits verwenden und testen, indem ihr
ein neues Laravel Projekt mit dem Parameter **--dev** erstellt.

**Hinweis: Ich rate davon ab, Laravel 11 bereits Produktiv einzusetzen, solange es nicht offiziell veröffentlicht ist,
da sich bis zur offiziellen Veröffentlichung noch Änderungen ergeben können.**

```sh
laravel new mein_laravel_elf_projekt --dev
```

## Fazit

Abschließend bin ich gespannt darauf, wie die Laravel-Community auf Laravel 11 insgesamt reagieren wird.
Die bevorstehenden Änderungen sehe ich durchweg als positive Entwicklung in die richtige Richtung. Auch wenn es
möglicherweise bedeutet, dass Anpassungen in unseren aktuellen Laravel-Projekten vorgenommen werden müssen, bin ich
optimistisch, dass die neuen Funktionen und Optimierungen den Arbeitsablauf erheblich verbessern werden. Da sich Dinge
möglicherweise ändern, werde ich diesen Beitrag aktualisieren, wenn weitere Features angekündigt werden. **Stay tuned!**
    