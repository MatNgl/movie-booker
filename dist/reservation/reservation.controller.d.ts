import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
export declare class ReservationController {
    private readonly reservationService;
    constructor(reservationService: ReservationService);
    createReservation(req: any, createReservationDto: CreateReservationDto): import("./reservation.service").Reservation;
    listReservations(req: any): import("./reservation.service").Reservation[];
    cancelReservation(req: any, id: number): import("./reservation.service").Reservation;
}
