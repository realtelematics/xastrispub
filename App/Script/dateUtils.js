Object.defineProperty(Date.prototype, 'paddedFormatTime', {
    value: function() {
        function pad2(n) {  
            return (n < 10 ? '0' : '') + n;
        }
        function convertTo12Hour(hours){
          if (hours > 12) {
          return hours -= 12;
      } else if (hours === 0) {
         return hours = 12;
      }
      return hours;
    }

        return pad2(convertTo12Hour(this.getHours())) +':'+
               pad2(this.getMinutes())
               //pad2(this.getSeconds());
    }
});

Object.defineProperty(Date.prototype, 'paddedFormat', {
    value: function() {
        function pad2(n) {  
            return (n < 10 ? '0' : '') + n;
        }
        function convertTo12Hour(hours){
	        if (hours > 12) {
			    return hours -= 12;
			} else if (hours === 0) {
			   return hours = 12;
			}
			return hours;
		}

        return this.getFullYear() +'-'+
               pad2(this.getMonth() + 1) + '-'+
               pad2(this.getDate()) +' '+
               pad2(convertTo12Hour(this.getHours())) +':'+
               pad2(this.getMinutes())
               //pad2(this.getSeconds());
    }
});

Object.defineProperty(Date.prototype, 'paddedFormatDateOnly', {
    value: function() {
        function pad2(n) {  
            return (n < 10 ? '0' : '') + n;
        }
        function convertTo12Hour(hours){
          if (hours > 12) {
          return hours -= 12;
      } else if (hours === 0) {
         return hours = 12;
      }
      return hours;
    }

        return this.getFullYear() +'-'+
               pad2(this.getMonth() + 1) + '-'+
               pad2(this.getDate());
    }
});

Object.defineProperty(Date.prototype, 'paddedFormatLong', {
    value: function() {
        function pad2(n) {  
            return (n < 10 ? '0' : '') + n;
        }
        function convertTo12Hour(hours){
	        if (hours > 12) {
			    return hours -= 12;
			} else if (hours === 0) {
			   return hours = 12;
			}
			return hours;
		}

        return this.getFullYear() +
               pad2(this.getMonth() + 1) + 
               pad2(this.getDate()) +
               pad2(convertTo12Hour(this.getHours())) +
               pad2(this.getMinutes()) +
               pad2(this.getSeconds());
    }
});
