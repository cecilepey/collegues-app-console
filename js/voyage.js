"use strict";
var Sejour = /** @class */ (function () {
    function Sejour(_nom, _prix) {
        this._nom = _nom;
        this._prix = _prix;
    }
    Object.defineProperty(Sejour.prototype, "nom", {
        get: function () {
            return this._nom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sejour.prototype, "prix", {
        get: function () {
            return this._prix;
        },
        enumerable: true,
        configurable: true
    });
    return Sejour;
}());
var SejourService = /** @class */ (function () {
    function SejourService() {
        this._sejour = [];
        this._sejour = [new Sejour('paris', 100), new Sejour('Nantes', 200)];
    }
    SejourService.prototype.rechercheSejourParNom = function (nom) {
        var sejour1 = null;
        this._sejour.forEach(function (sejour) {
            if (sejour.nom === nom) {
                sejour1 = sejour;
            }
        });
        return sejour1;
    };
    return SejourService;
}());
var sejourService = new SejourService();
console.log(sejourService.rechercheSejourParNom('Nantes'));
