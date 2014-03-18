(function() {
  describe('action attribute (mainly for forms) test', function() {
    context('ignores safe patterns', function() {
      context(null, function() {
	var good = 'var action = "static string";';
	it(good, function(){
	  chai.expect(ScanJS.scan(good, ScanJS.rules, document.location.pathname)).to.be.empty;
	});
      });
    });
    context('detects dangerous patterns', function() {
      context(null, function() {
	var bad = 'var a=document.createElement("form"); a.action="demo_form.asp"; document.body.appendChild(a);';
	it(bad, function(){
	  chai.expect(ScanJS.scan(bad, ScanJS.rules, document.location.pathname)).not.to.be.empty;
	});
      });
      context(null, function() {
	var bad = 'var a=document.createElement("form"); a.setAttribute("action", "demo_form.asp"); document.body.appendChild(a);';
	it(bad, function(){
	  chai.expect(ScanJS.scan(bad, ScanJS.rules, document.location.pathname)).not.to.be.empty;
	});
      });
      context(null, function() {
	var bad = 'var a=document.createElement("div"); a.innerHTML="<form action=\'demo.asp\'></form>"; document.body.appendChild(a);';
	it(bad, function(){
	  chai.expect(ScanJS.scan(bad, ScanJS.rules, document.location.pathname)).not.to.be.empty;
	});
      });
    });
  });
})();