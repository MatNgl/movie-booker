"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationService = void 0;
const common_1 = require("@nestjs/common");
let ReservationService = class ReservationService {
    constructor() {
        this.reservations = [];
        this.idCounter = 1;
    }
    createReservation(userId, createReservationDto) {
        const { movieId, startTime } = createReservationDto;
        const start = new Date(startTime);
        if (isNaN(start.getTime())) {
            throw new common_1.BadRequestException('La date de début est invalide.');
        }
        const end = new Date(start);
        end.setHours(end.getHours() + 2);
        const conflict = this.reservations.find(res => res.userId === userId &&
            res.status === 'active' &&
            (start < res.endTime && end > res.startTime));
        if (conflict) {
            throw new common_1.BadRequestException('Conflit de réservation : vous avez déjà une réservation qui chevauche ce créneau horaire.');
        }
        const newReservation = {
            id: this.idCounter++,
            userId,
            movieId,
            startTime: start,
            endTime: end,
            status: 'active',
        };
        this.reservations.push(newReservation);
        return newReservation;
    }
    listReservations(userId) {
        return this.reservations.filter(res => res.userId === userId && res.status === 'active');
    }
    cancelReservation(userId, reservationId) {
        const reservation = this.reservations.find(res => res.id === reservationId && res.userId === userId);
        if (!reservation) {
            throw new common_1.NotFoundException('Réservation introuvable.');
        }
        if (reservation.status === 'cancelled') {
            throw new common_1.BadRequestException('La réservation est déjà annulée.');
        }
        reservation.status = 'cancelled';
        return reservation;
    }
};
exports.ReservationService = ReservationService;
exports.ReservationService = ReservationService = __decorate([
    (0, common_1.Injectable)()
], ReservationService);
//# sourceMappingURL=reservation.service.js.map