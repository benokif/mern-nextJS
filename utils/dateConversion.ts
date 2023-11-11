export interface DataObject {
  createdAt: string;
}

interface GroupedObject {
  createdAt: string;
  count: number;
}

function groupObjectsByMonth(data: DataObject[]): GroupedObject[] {
  const groupedMap = new Map<string, GroupedObject>();

  for (const obj of data) {
    const createdAt = new Date(obj.createdAt);
    const monthKey = `${createdAt.getUTCFullYear()}-${createdAt.getUTCMonth()  < 9 ? '0': ''}${
      createdAt.getUTCMonth() + 1
    }`;
    
    
    if (groupedMap.has(monthKey)) {
      groupedMap.get(monthKey)!.count++;
    } else {
    

      groupedMap.set(monthKey, { createdAt: monthKey, count: 1 });
    }
  }

  const groupedData: GroupedObject[] = Array.from(groupedMap.values());

  return groupedData;
}

export default groupObjectsByMonth
