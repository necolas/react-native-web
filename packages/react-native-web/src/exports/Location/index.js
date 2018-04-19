
import SyncTasks  from 'synctasks'
import Types from  '../../../../../types/Location'
export class Location {
    setConfiguration(config) {
        if (this.isAvailable() && navigator.geolocation.setRNConfiguration) {
            navigator.geolocation.setRNConfiguration(config);
        }
    }

    // Check if a geolocation service is available.
    isAvailable() {
        return !!('geolocation' in navigator);
    }

    // Get the current location of the user. This method returns a promise that either
    // resolves to the position or rejects with an error code.
    getCurrentPosition(options) {
        const deferred = SyncTasks.Defer();
        let reportedError = false;

        if (!this.isAvailable()) {
            const  error = {
                code: Types.LocationErrorType.PositionUnavailable,
                message: 'Position unavailable because device does not support it.',
                PERMISSION_DENIED: 0,
                POSITION_UNAVAILABLE: 1,
                TIMEOUT: 0
            };
            return deferred.reject(error).promise();
        }

        navigator.geolocation.getCurrentPosition((position) => {
            deferred.resolve(position);
        }, (error) => {
            // We need to protect against a known bug on some platforms where
            // a timeout error is reported after other types of errors (e.g.
            // the user hasn't granted access).
            if (!reportedError) {
                deferred.reject(error);
                reportedError = true;
            }
        }, options);

        return deferred.promise();
    }

    // Get the current location of the user on a repeating basis. This method returns
    // a promise that resolves to a watcher id or rejects with an error code. If resolved,
    // future locations and errors will be piped through the provided callbacks.
    watchPosition(successCallback, errorCallback,
        options) {
        if (!this.isAvailable()) {
            return SyncTasks.Rejected(Types.LocationErrorType.PositionUnavailable);
        }

        const watchId = navigator.geolocation.watchPosition((position) => {
            successCallback(position);
        }, (error) => {
            if (errorCallback) {
                errorCallback(error.code );
            }
        }, options) ;

        return SyncTasks.Resolved(watchId);
    }

    // Clears a location watcher from watchPosition.
    clearWatch(watchID) {
        navigator.geolocation.clearWatch(watchID);
    }
}

export default new Location();