export type Rule = {
	title: string;
	message?: string;
	frequency: number;
	days: number[];
	startTime: string;
	endTime: string;
};
