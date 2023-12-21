create table CarStatus (
	time 				TIMESTAMPTZ	not null,
	SessionUID			bigint		not null,
	FrameIdentifier		integer		not null,
	SessionTime 		real		not null,
	PlayerCarIndex		smallint	not null,
	TractionControl		smallint	null,
	ABS 				smallint	null,
	FuelMix				smallint	null,
	FrontBrakeBias		smallint	null,
	PitLimiter			smallint	null,
	FuelInTank			real		null,
	FuelCapacity		real		null,
	FuelRemainingLaps	real		null,
	MaxRPM				integer		null,
	IdleRPM				integer		null,
	MaxGears			smallint	null,
	DRSAllowed			smallint	null,
	FLTyreWear			smallint	null,
	FRTyreWear			smallint	null,
	RLTyreWear			smallint	null,
	RRTyreWear			smallint	null,
	ActualTyreCompound	smallint	null,
	TyreVisualCompound	smallint	null,
	FLTyreDamage		smallint	null,
	FRTyreDamage		smallint	null,
	RLTyreDamage		smallint	null,
	RRTyreDamage		smallint	null,
	FLWingDamage		smallint	null,
	FRWingDamage		smallint	null,
	RearWingDamage		smallint	null,
	EngineDamage		smallint	null,
	GearBoxDamage		smallint	null,
	VehicleFIAFlages	smallint	null,
	ERSStoreEnergy		real		null,
	ERSDeployMode		smallint	null,
	ERSObtainedThisLapMGUK real		null,
	ERSObtainedThisLapMGUH real		null,
	ERSDeployedThisLap	real		null
);

select create_hypertable('CarStatus','time');
create index idx_session_uid_car_status on CarStatus (SessionUID);

create table CarTelemetry (
	time 				TIMESTAMPTZ	not null,
	SessionUID			bigint		not null,
	FrameIdentifier		integer		not null,
	SessionTime 		real		not null,
	PlayerCarIndex		smallint	not null,
	Speed				integer		null,
	Throttle			real		null,
	Steering			real		null,
	Brake				real		null,
	Clutch				integer		null,
	Gear				integer		null,
	EngineRPM			integer		null,
	DRSEnabled			integer		null,
	RevLights			integer		null,
	FLBrakeTemp			integer		null,
	FRBrakeTemp			integer		null,
	RLBrakeTemp			integer		null,
	RRBrakeTemp			integer		null,
	FLTyreSurfaceTemp	integer		null,
	FRTyreSurfaceTemp	integer		null,
	RLTyreSurfaceTemp	integer		null,
	RRTyreSurfaceTemp	integer		null,
	FLTyreInnerTemp		integer		null,
	FRTyreInnerTemp		integer		null,
	RLTyreInnerTemp		integer		null,
	RRTyreInnerTemp		integer		null,
	EngineTemp			integer		null,
	FLTyrePressure		real		null,
	FRTyrePressure		real		null,
	RLTyrePressure		real		null,
	RRTyrePressure		real		null,
	FLDrivingSurface	integer		null,
	FRDrivingSurface	integer		null,
	RLDrivingSurface	integer		null,
	RRDrivingSurface	integer		null
);

select create_hypertable('CarTelemetry','time');
create index idx_session_uid_car_telemetry on CarTelemetry (SessionUID);

create table Lap (
	time 				TIMESTAMPTZ	not null,
	SessionUID			bigint		not null,
	FrameIdentifier		integer		not null,
	SessionTime 		real		not null,
	PlayerCarIndex		smallint	not null,
	LastLapTime			real		null,
	CurrentLapTime		real		null,
	BestLapTime			real		null,
	Sector1Time			real		null,
	Sector2Time			real		null,
	LapDistance			real		null,
	TotalDistance		real		null,
	CarPosition			smallint	null,
	CurrentLapNum		smallint	null,
	PitStatus			smallint	null,
	Sector				smallint	null,
	CurrentLapInvalid	smallint	null,
	TimePenalties		smallint	null,
	GridPosition		smallint	null,
	DriverStatus		smallint	null,
	ResultStatus		smallint	null
);

select create_hypertable('Lap','time');
create index idx_session_uid_lap on Lap (SessionUID);

create table Participant (
	time 				TIMESTAMPTZ	not null,
	SessionUID			bigint		not null,
	FrameIdentifier		integer		not null,
	SessionTime 		real		not null,
	PlayerCarIndex		smallint	not null,
	NumOfActiveCars		smallint	null,
	AIControlled		smallint	null,
	DriverId			smallint	null,
	TeamId				smallint	null,
	RaceNumber			smallint	null,
	Nationality			smallint	null,
	Name				text		null
);

select create_hypertable('Participant','time');
create index idx_session_uid_participant on Participant (SessionUID);

create table Session (
	time 				TIMESTAMPTZ	not null,
	SessionUID			bigint		not null,
	FrameIdentifier		integer		not null,
	SessionTime 		real		not null,
	PlayerCarIndex		smallint	not null,
	Weather				smallint	null,
	TrackTemp			smallint	null,
	AirTemp				smallint	null,
	TotalLaps			smallint	null,
	TrackId				smallint	null,
	TrackLength			integer		null,
	SessionType			smallint	null,
	SessionDuration		integer		null,
	SessionTimeLeft		integer		null,
	SafetyCarStatus		smallint	null
);

select create_hypertable('Session','time');
create index idx_session_uid_session on Session (SessionUID);

create table Drivers (
	Id 		smallint	not null,
	Name	text		not null
);

create table Nationalities (
	Id 		smallint	not null,
	Name	text		not null
);

create table Teams (
	Id 		smallint	not null,
	Name	text		not null
);

create table Tracks (
	Id 		smallint	not null,
	Name	text		not null
);