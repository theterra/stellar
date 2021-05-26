import Api from 'helpers/Api';

const config = {
    baseURL: 'https://api.spacexdata.com/v3',
    timeout: 5000,
};

class TicketingService extends Api {
    constructor() {
        super(config);
    }

    async getData() {
        const response = await this.get('capsules');
        return response.map((item) => ({ id: item.capsule_id }));
    }
}

export default TicketingService;
