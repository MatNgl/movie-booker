"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationController = void 0;
const common_1 = require("@nestjs/common");
const reservation_service_1 = require("./reservation.service");
const create_reservation_dto_1 = require("./dto/create-reservation.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ReservationController = class ReservationController {
    constructor(reservationService) {
        this.reservationService = reservationService;
    }
    createReservation(req, createReservationDto) {
        const userId = req.user.userId || req.user.sub;
        return this.reservationService.createReservation(userId, createReservationDto);
    }
    listReservations(req) {
        const userId = req.user.userId || req.user.sub;
        return this.reservationService.listReservations(userId);
    }
    cancelReservation(req, id) {
        const userId = req.user.userId || req.user.sub;
        return this.reservationService.cancelReservation(userId, id);
    }
};
exports.ReservationController = ReservationController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Créer une réservation',
        description: 'Crée une réservation pour un film avec une durée fixe de 2 heures. Vérifie les conflits de créneau pour éviter des chevauchements.',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Réservation créée avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Conflit de réservation ou données invalides.' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_reservation_dto_1.CreateReservationDto]),
    __metadata("design:returntype", void 0)
], ReservationController.prototype, "createReservation", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Lister les réservations',
        description: 'Récupère la liste des réservations actives de l’utilisateur connecté.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des réservations renvoyée avec succès.' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReservationController.prototype, "listReservations", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Annuler une réservation',
        description: 'Annule une réservation donnée par son ID pour l’utilisateur connecté.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Réservation annulée avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Réservation introuvable.' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], ReservationController.prototype, "cancelReservation", null);
exports.ReservationController = ReservationController = __decorate([
    (0, swagger_1.ApiTags)('reservation'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('reservations'),
    __metadata("design:paramtypes", [reservation_service_1.ReservationService])
], ReservationController);
//# sourceMappingURL=reservation.controller.js.map