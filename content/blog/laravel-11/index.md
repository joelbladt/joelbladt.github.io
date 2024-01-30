---
title: "Ein Blick darauf, was in Laravel 11 kommt"
titleImage: "laravel-11.jpg"
date: 2024-01-30T01:14:13+02:00
draft: false
toc: false
images:
tags:
  - Laravel
author: "Joel Bladt"
---

Laravel 11 soll nicht vor dem ersten Quartal 2024 veröffentlicht werden, aber einige neue Funktionen wurden bereits bekannt gegeben, und Taylor geht in seiner Laracon-Keynote auf einige große neue Verbesserungen ein.

## Schlanke Verzeichnisstruktur

Bislang handelt es sich nur um eine Beta-Vorschau. Sie kann sich noch ändern, aber im Moment ist folgendes zu erwarten...

Controller erweitern nicht mehr standardmäßig irgendetwas.

Kein Middleware-Verzeichnis mehr. Derzeit enthält Laravel neun Middleware und viele würden Sie nie anpassen. Wenn Sie sie jedoch anpassen möchten, wird dies in den App/ServiceProvider verschoben. Zum Beispiel:

```php
public function boot(): void
{
    EncryptCookies::except(['some_cookie']);
}
```

## Kein Http/Kernel mehr

Die meisten Dinge, die Sie früher im Kernel erledigen konnten, können Sie jetzt im Bootstrap/App erledigen.

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
## Effizientes Löschen mehrerer lokaler Branches

Die Model Casts sind jetzt als Methode und nicht mehr als Property definiert. Wenn sie als Methode definiert sind, können wir andere Dinge tun, wie z.B. andere Methoden direkt von den Casts aufrufen. Hier ist ein Beispiel mit einer neuen Laravel 11 `AsEnumCollection`:

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

## Dump

Dies zielt darauf ab, den Kern des Frameworks zu rationalisieren, da mehrere Klassen derzeit "dd" oder "dump" Methoden haben. Außerdem können Sie diese Dumpable-Eigenschaft in Ihren eigenen Klassen verwenden:

```php
class Stringable implements JsonSerializable, ArrayAccess
{
    use Conditionable, Dumpable, Macroable, Tappable;
 
    str('foo')->dd();
    str('foo')->dump();
```

## Änderungen in der Konfiguration

Laravel hat eine Menge von Konfigurationsdateien, und Laravel 11 entfernt diese, und alle Konfigurationsoptionen zu verringern. Die .env wurde erweitert, um alle Optionen, die Sie einstellen möchten, zu enthalten.

Parallel dazu gibt es einen neuen Artisan-Befehl `config:publish`, mit dem Sie jede beliebige Konfiguration wiederherstellen können. Die neue Kaskadierung ermöglicht es Ihnen, alle Optionen, die Sie nicht anpassen möchten, zu entfernen, auch wenn Sie sie zurückbringen.

## Schlankere Standard-Migrationen

Wenn Sie eine neue Laravel-Anwendung starten, wird sie mit einigen Standardmigrationen aus den Jahren 2014 und 2019 ausgeliefert. Bei diesen werden nun die Daten entfernt und in nur zwei Dateien verschoben.

## Änderungen der Routes

Standardmäßig wird es nur zwei Routendateien geben, console.php und web.php. API-Routen werden nun über `php artisan install:api` aktiviert, wodurch Sie die API-Routen-Datei und Laravel Sanctum erhalten.

Dasselbe gilt für die Websocket-Übertragung, `php artisan install:broadcasting`

## Console Kernel entfernt

Der Konsolenkern wird entfernt und Sie können stattdessen Ihre Konsolenbefehle direkt in `routes/console.php` definieren.

## Named arguments
Named arguments fallen nicht unter die Abwärtskompatibilitätsrichtlinien von Laravel. Bei Bedarf können wir Funktionsargumente umbenennen, um die Laravel-Codebasis zu verbessern. Die Verwendung von benannten Argumenten beim Aufruf von Laravel-Methoden sollte daher mit Bedacht und in dem Bewusstsein erfolgen, dass sich die Parameternamen in Zukunft ändern können.

## Eager Load Limit

Laravel 11 integriert den Code hinter dem Paket "eager load limit":

```php
User::select('id', 'name')->with([
    'articles' => fn($query) => $query->limit(5)
])->get();
```
Read more about Eager Load Limit here.

## PHP 8.2 Mindestunterstützung

Dies war eine frühe Entscheidung, aber Laravel 11-Anwendungen erfordern mindestens PHP 8.2. Wenn Sie eine ältere Version von PHP verwenden, ist jetzt ein guter Zeitpunkt, diese zu aktualisieren.

## Laravel 11 installieren

Laravel 11 ist noch nicht freigegeben, aber Sie können es bereits verwenden und testen, indem Sie Laravel new mit der Option --dev ausführen:

```sh
laravel new projectname --dev
```

Beachten Sie, dass sich bis zur offiziellen Veröffentlichung von Laravel 11 noch einiges ändern wird.

## Laravel Support Policy

Für alle Laravel-Versionen werden 18 Monate lang Fehlerbehebungen und 2 Jahre lang Sicherheitsbehebungen bereitgestellt. Für alle zusätzlichen Bibliotheken, einschließlich Lumen, erhält nur die letzte Hauptversion Bugfixes.

## Fazit

Bislang sind alle diese Funktionen als Beta-Version von Laravel 11 zu betrachten und sollen Ihren Arbeitsablauf verbessern. Die Dinge können und werden sich wahrscheinlich ändern, und ich werde diesen Beitrag aktualisieren, wenn neue Funktionen angekündigt werden.
