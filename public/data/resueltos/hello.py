import sys
lines = sys.argv[1]
archivo = open(lines,"r+")
c = 0
for lineas in archivo:
	print(lineas)